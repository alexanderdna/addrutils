describe('cli', () => {
  let originalArgv;

  beforeEach(() => {
    jest.resetModules();
    originalArgv = process.argv;
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.argv = originalArgv;
  });

  it('prints account when no arguments', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand();
    expect(consoleLog).toBeCalledTimes(3);
  });

  it('prints account when provided mnemonic', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand(
      '-m',
      'member task lamp fantasy adjust potato laptop print churn such zero junk'
    );
    expect(consoleLog).toBeCalledWith(
      'member task lamp fantasy adjust potato laptop print churn such zero junk'
    );
    expect(consoleLog).toBeCalledWith(
      '0x3f70ea28de036a1cd311663b6061bb8a66811a04590132ed78e3775d6d17f911'
    );
    expect(consoleLog).toBeCalledWith(
      '0x47840825d39B42E5629844aAcD3c4f4a2ec221D5'
    );
    expect(consoleLog).toBeCalledTimes(3);
  });

  it('prints account when provided mnemonic and account index', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand(
      '-m',
      'member task lamp fantasy adjust potato laptop print churn such zero junk',
      '-i',
      '5'
    );
    expect(consoleLog).toBeCalledWith(
      'member task lamp fantasy adjust potato laptop print churn such zero junk'
    );
    expect(consoleLog).toBeCalledWith(
      '0x23c8fa1e6f7f3cb281a62c2e54b676a79cfc2a513d156f975db417b8418a27bb'
    );
    expect(consoleLog).toBeCalledWith(
      '0x4AF59aa98008B352e258D4f064768139d82a1Ab1'
    );
    expect(consoleLog).toBeCalledTimes(3);
  });

  it('prints account when provided private key', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand(
      '-p',
      '0x3f70ea28de036a1cd311663b6061bb8a66811a04590132ed78e3775d6d17f911'
    );
    expect(consoleLog).toBeCalledWith(
      '0x3f70ea28de036a1cd311663b6061bb8a66811a04590132ed78e3775d6d17f911'
    );
    expect(consoleLog).toBeCalledWith(
      '0x47840825d39B42E5629844aAcD3c4f4a2ec221D5'
    );
    expect(consoleLog).toBeCalledTimes(2);
  });

  it('prints 5 accounts', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand('-c', 5);
    expect(consoleLog).toBeCalledTimes(3 * 5);
  });

  it('prints account without mnemonic', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand('--hide-mnemonic');
    expect(consoleLog).toBeCalledTimes(2);
  });

  it('prints account without mnemonic', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand(
      '-m',
      'member task lamp fantasy adjust potato laptop print churn such zero junk',
      '--hide-mnemonic'
    );
    expect(consoleLog).toBeCalledWith(
      '0x3f70ea28de036a1cd311663b6061bb8a66811a04590132ed78e3775d6d17f911'
    );
    expect(consoleLog).toBeCalledWith(
      '0x47840825d39B42E5629844aAcD3c4f4a2ec221D5'
    );
    expect(consoleLog).toBeCalledTimes(2);
  });

  it('prints account without private key', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand(
      '-m',
      'member task lamp fantasy adjust potato laptop print churn such zero junk',
      '--hide-private-key'
    );
    expect(consoleLog).toBeCalledWith(
      'member task lamp fantasy adjust potato laptop print churn such zero junk'
    );
    expect(consoleLog).toBeCalledWith(
      '0x47840825d39B42E5629844aAcD3c4f4a2ec221D5'
    );
    expect(consoleLog).toBeCalledTimes(2);
  });

  it('prints account without address', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand(
      '-m',
      'member task lamp fantasy adjust potato laptop print churn such zero junk',
      '--hide-address'
    );
    expect(consoleLog).toBeCalledWith(
      'member task lamp fantasy adjust potato laptop print churn such zero junk'
    );
    expect(consoleLog).toBeCalledWith(
      '0x3f70ea28de036a1cd311663b6061bb8a66811a04590132ed78e3775d6d17f911'
    );
    expect(consoleLog).toBeCalledTimes(2);
  });

  it('prints account without private key and address', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand(
      '-m',
      'member task lamp fantasy adjust potato laptop print churn such zero junk',
      '--hide-private-key',
      '--hide-address'
    );
    expect(consoleLog).toBeCalledWith(
      'member task lamp fantasy adjust potato laptop print churn such zero junk'
    );
    expect(consoleLog).toBeCalledTimes(1);
  });

  it('prints 1 account when provided -c < 0', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    await runCommand('-c', '-1');
    expect(consoleLog).toBeCalledTimes(3);
  });

  it('throws when provided invalid private key', async () => {
    const consoleLog = jest.spyOn(console, 'log');
    const consoleError = jest.spyOn(console, 'error');
    await runCommand('-p', 'asldksdf');
    expect(consoleLog).toBeCalledTimes(0);
    expect(consoleError).toBeCalledWith('Error: malformed private key');
  });

  async function runCommand(...args) {
    process.argv = ['node', 'cli.js', ...args];
    return require('../src/cli.js');
  }
});
