import bunyan from "bunyan";
import XPath from "./XPath";
import DocumentReader from "./DocumentReader";
import ComponentFinder from "./ComponentFinder";
import ChildrenSizeComparator from "./comparators/ChildrenSizeComparator";
import TextComparator from "./comparators/TextComparator";
import TagComparator from "./comparators/TagComparator";

const logger = bunyan.createLogger({ name: "component-finder" });

// data inputs
const originalPath = process.argv[2];
const diffPath = process.argv[3];
const elementId = process.argv[4] || "make-everything-ok-button";

const documentReader = new DocumentReader(logger);
const componentFinder = new ComponentFinder({
  logger,
  adjuster: new ChildrenSizeComparator(),
  comparators: [new TextComparator(0.2), new TagComparator(0.3)]
});
const xPath = new XPath();

documentReader
  .getDoms(originalPath, diffPath)
  .then(([originalHtml, diffHtml]) => componentFinder.find(elementId, originalHtml, diffHtml))
  .then(element =>
    logger.info(`Component path is: ${xPath.path(element)} and its html: ${element.innerHTML}`)
  );
