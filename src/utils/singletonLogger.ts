class Logger {
    private static instance: Logger;
    private logs: string[];
  
    private constructor() {
      this.logs = [];
    }
  
    public static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
  
    public addLog(log: string): void {
      this.logs.push(log);
    }
  
    public getLogs(): string[] {
      return this.logs;
    }
  }

const logger = Logger.getInstance();
logger.addLog("Some log message");
const logs = logger.getLogs();
console.log(logs); // output: ["Some log message"]

class Singleton {
    private static instance: Singleton;
    private someProperty: string;
  
    constructor() {
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      Singleton.instance = this;
      this.someProperty = "initial value";
    }
  
    public setSomeProperty(value: string): void {
      this.someProperty = value;
    }
  
    public getSomeProperty(): string {
      return this.someProperty;
    }
}
  
const singleton = new Singleton();
singleton.setSomeProperty("new value");
const value = singleton.getSomeProperty();
console.log(value); // output: "new value"
    