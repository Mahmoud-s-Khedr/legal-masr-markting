import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectRecommendedDownload, recommendedDownloadForBrowser } from '../src/lib/recommend-download.js';
import { downloads } from '../src/lib/downloads.js';

test('desktop recommendations choose the installer and supported Linux packages', () => {
  const cases = [
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'windows-installer'],
    ['Mozilla/5.0 (Windows NT 10.0; WOW64)', 'windows-installer'],
    ['Mozilla/5.0 (X11; Ubuntu; Linux x86_64)', 'linux-deb'],
    ['Mozilla/5.0 (X11; Debian; Linux x86_64)', 'linux-deb'],
    ['Mozilla/5.0 (X11; Fedora; Linux x86_64)', 'linux-rpm'],
    ['Mozilla/5.0 (X11; Linux x86_64)', 'linux-appimage'],
  ];
  for (const [userAgent, expected] of cases) {
    assert.equal(detectRecommendedDownload({ userAgent }), expected);
    assert.ok(downloads.some(item => item.id === expected));
  }
});

test('phones and iPads in desktop mode receive the mobile explanation', () => {
  for (const userAgent of ['Mozilla/5.0 (Linux; Android 15)', 'iPhone', 'iPad']) {
    assert.equal(detectRecommendedDownload({ userAgent }), 'mobile');
  }
  assert.equal(detectRecommendedDownload({ userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 5 }), 'mobile');
  assert.equal(detectRecommendedDownload({ userAgentData: { mobile: true } }), 'mobile');
});

test('unsupported and unknown devices do not receive a direct binary suggestion', () => {
  for (const userAgent of ['Macintosh; Intel Mac OS X', 'X11; CrOS x86_64', 'Linux aarch64', 'Linux i686', 'X11; FreeBSD amd64', '']) {
    assert.equal(detectRecommendedDownload({ userAgent }), null);
  }
  assert.equal(detectRecommendedDownload({ userAgent: 'Windows NT 10.0', platform: 'Win32' }), null);
  assert.equal(detectRecommendedDownload({ userAgentData: { platform: 'Windows', architecture: 'arm', bitness: '64' } }), null);
  assert.equal(detectRecommendedDownload({ userAgentData: { platform: 'Windows', architecture: 'x86', bitness: '32' } }), null);
});

test('client hints can reveal ARM behind a reduced Windows user agent', async () => {
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
  assert.equal(await recommendedDownloadForBrowser({ userAgent, userAgentData: {
    platform: 'Windows', mobile: false,
    getHighEntropyValues: async () => ({ architecture: 'arm', bitness: '64' }),
  } }), null);
  assert.equal(await recommendedDownloadForBrowser({ userAgent, userAgentData: {
    platform: 'Windows', mobile: false,
    getHighEntropyValues: async () => { throw new Error('Blocked'); },
  } }), 'windows-installer');
});
