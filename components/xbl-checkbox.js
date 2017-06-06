
class XblCheckbox extends Observer {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    // Attach a shadow root to <xbl-checkbox>.
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
      :host {
        opacity: 0.8;
        will-change: opacity;
        transition: opacity 300ms ease-in-out;
      }
      :host(:hover),
      :host[checked] {
        opacity: 1;
      }
      #label {
        user-select: none;
      }
      </style>
      <label id="label" for="checkbox"></label>
      <input id="checkbox" type="checkbox" />
    `;

    this.label = this.shadowRoot.querySelector("#label");
    this.checkbox = this.shadowRoot.querySelector("#checkbox");

    // Copy over the input element's property to the host
    this.checkbox.addEventListener("change", () => {
      if (this.checkbox.checked) {
        this.setAttribute("checked", "checked");
      } else {
        this.removeAttribute("checked");
      }
    });
    this.updateDOM();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback XblCheckbox", name, oldValue, newValue);
    super.attributeChangedCallback(name, oldValue, newValue);

    this.updateDOM();
  }

  updateDOM() {
    if (this.label) {
      this.label.textContent = this.getAttribute("label");
      this.checkbox.checked = this.getAttribute("checked");
    }
  }
}

customElements.define('xbl-checkbox', XblCheckbox);
