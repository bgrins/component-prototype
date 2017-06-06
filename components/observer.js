
// https://html.spec.whatwg.org/multipage/scripting.html#custom-elements-autonomous-example

class Observer extends HTMLElement {
  constructor() {
    super();
    console.log("Observer constructed", this);
    if (this.getAttribute("observes")) {
      this.setupMutationObserver(this.getAttribute("observes"));
    }
  }

  connectedCallback() { }
  disconnectedCallback() { }

  static get observedAttributes() { return ["observes", "label", "checked"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback observer");
    if (name === "observes") {
      this.setupMutationObserver(newValue);
    }
  }

  setupMutationObserver(elementID) {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }

    this._observeTarget = document.getElementById(elementID);
    if (this._observeTarget) {
      this._observer = new MutationObserver(mutations => {
        console.log("Observed changes", mutations);
        mutations.forEach(mutation => {
          if (!this._observeTarget.hasAttribute(mutation.attributeName)) {
            this.removeAttribute(mutation.attributeName);
          }
        });

        this.copyAttributes();
      });
      this._observer.observe(this._observeTarget, {
        attributes: true,
      });
      this.copyAttributes();
    }
  }

  copyAttributes() {
    if (!this._observeTarget) {
      return;
    }

    for (var i = 0; i < this._observeTarget.attributes.length; i++) {
      var attrib = this._observeTarget.attributes[i];
      if (attrib.name !== "id") {
        this.setAttribute(attrib.name, attrib.value);
      }
    }
  }
}
