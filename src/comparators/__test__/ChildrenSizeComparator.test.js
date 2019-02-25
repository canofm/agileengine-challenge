import { JSDOM } from "jsdom";
import ChildrenSizeComparator from "../ChildrenSizeComparator";

describe("ChildrenSizeComparator", () => {
  it("adjustSample", () => {
    const id = "original";
    const otherId = "idOne";
    const otherId2 = "idTwo";
    const dom = new JSDOM(
      `<!DOCTYPE html>
        <div class="classOne">
          <h1>aTitle</h1>
          <ul id="${id}">
            <li>opt 1</li>
            <li>opt 2</li>
          </ul>
        </div>
      </html>`
    );

    const otherDom = new JSDOM(
      `<!DOCTYPE html>
        <div class="otherClass">
          <h1>otherTitle</h1>
          <ul id="${otherId}">
            <li>opt 1</li>
            <li>opt 2</li>
          </ul>
          <ul id="${otherId2}">
            <li>opt 1</li>
            <li>opt 2</li>
          </ul>
          <ul id="thisShouldBeIgnore">
            <li>opt 1</li>
            <li>opt 2</li>
            <li>opt 3</li>
          </ul>
        </div>
      </html>`
    );

    const originalElement = dom.window.document.getElementById(id);
    const childrenSizeComparator = new ChildrenSizeComparator();
    const results = childrenSizeComparator.adjustSample(
      originalElement,
      Object.values(otherDom.window.document.body.children)
    );

    expect(results.length).toBe(2);
    expect(results[0].id).toBe(otherId);
    expect(results[1].id).toBe(otherId2);
  });
});
