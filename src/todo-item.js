import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-radio-button/paper-radio-button.js";

class TodoItem extends PolymerElement {
  static get is() {
    return "todo-item";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <paper-radio-button noink>
        <slot class="title"></slot>
      </paper-radio-button>
    `;
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();
  }
}

window.customElements.define(TodoItem.is, TodoItem);
