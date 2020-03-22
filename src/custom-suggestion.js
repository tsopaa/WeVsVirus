import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-button/paper-button.js";


class CustomSuggestion extends PolymerElement {
  static get is() {
    return "custom-suggestion";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          color: white;
        }
        iron-icon {
          color: white;
        }

      </style>
      <input type="text" name="title" id="title-input" value="{{title}}">
      <input type="text" name="time" id="time-input">
      <input type="text" name="description" id="description-input">
      <paper-button id="addSuggestionBtn" on-click="_addSuggestionClicked">Hinzufuegen</paper-button>
      <iron-icon icon="arrow-back" on-click="_backClicked"></iron-icon>
    `;
  }

  static get properties() {
    return {
      title: {
        observer: "_titlechanged"
      }
    };
  }

  ready() {
    super.ready();
  }

  _addSuggestionClicked() {
    this.dispatchEvent(
      new CustomEvent("add-suggestion", {
        detail: {
          title: this.title,
          time: this.time,
          description: this.description
        }
      })
    );
  }

  _titlechanged() {
    console.log(this.title);
  }

  _backClicked() {
    this.dispatchEvent(new CustomEvent("back-clicked"));
  }
}

window.customElements.define(CustomSuggestion.is, CustomSuggestion);