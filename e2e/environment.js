const { DetoxCircusEnvironment, SpecReporter, WorkerAssignReporter } = require('detox/runners/jest-circus');

class CustomDetoxEnvironment extends DetoxCircusEnvironment {
  constructor(config, context) {
    super(config, context);

    this.registerListeners({
      SpecReporter,
      WorkerAssignReporter,
    });
  }

  async initDetox() {
    const instance = await super.initDetox();

    this.global.detox.__waitUntilArtifactsManagerIsIdle__ = () => {
      return instance._artifactsManager._idlePromise;
    };

    return instance;
  }
}

module.exports = CustomDetoxEnvironment;
