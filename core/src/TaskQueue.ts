// job queue for concurrent requests
export class AsyncTaskQueue {
  private inProgress = false;
  private queue: {
    promise: () => Promise<void>;
    resolve: (value: any) => void;
    reject: (err: Error) => void;
  }[] = [];

  public add(promise: () => Promise<void>) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promise, resolve, reject });
      this.process();
    });
  }

  public process() {
    if (this.inProgress) return;
    const task = this.queue.shift();
    if (!task) return;
    this.inProgress = true;
    task
      .promise()
      .then((value) => {
        this.inProgress = false;
        task.resolve(value);
        this.process();
      })
      .catch((err) => {
        this.inProgress = false;
        task.reject(err);
        this.process();
      });
  }
}
