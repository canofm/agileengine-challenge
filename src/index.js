import bunyan from "bunyan";
import XPath from "./XPath";

const logger = bunyan.createLogger({ name: "component-finder" });

// data inputs
const originalPath = process.argv[2];
const diffPath = process.argv[3];
const elementId = process.argv[4] || "make-everything-ok-button";

const documentReader = new DocumentReader(logger);
const componentFinder = new ComponentFinder(logger);
const xPath = new XPath();

documentReader
  .getDoms(originalPath, diffPath)
  .then(([originalHtml, diffHtml]) => componentFinder.find(elementId, originalHtml, diffHtml))
  .then(element =>
    logger.info(`Component path is: ${xPath.path(element)} and its html: ${element.innerHTML}`)
  );
