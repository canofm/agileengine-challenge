import { JSDOM } from "jsdom";
import * as Bluebird from "bluebird";

class DocumentReader {
  constructor(logger) {
    this.logger = logger;
  }

  read(path) {
    return JSDOM.fromFile(path).catch(err => this.logger.error(err));
  }

  getDOMs(...paths) {
    return Bluebird.map(paths, path => this.read(path));
  }
}

export default DocumentReader;
