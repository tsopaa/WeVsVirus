import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/image-icons.js";

class SuggestionElement extends PolymerElement {
  static get is() {
    return "suggestion-element";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        h3 {
          margin-top: 7px;
          margin-bottom: 7px;
          font-size: 24px;
        }
        .description {
          font-size: 20px;
        }
        .card-actions {
          margin-top: 2px;
        }
        #indicator {
          width: 20%;
          text-align: right;
        }
        #card-title {
          width: 70%;
        }
        #time-icon {
          margin-top: -2px;
        }
        .oneline {
          display: inline-block;
        }
        @media (max-width: 700px) {
          h3 {
            margin-top: 7px;
            margin-bottom: 7px;
            font-size: 20px;
          }
          .description {
            font-size: 16px;
          }
        }
      </style>
      <paper-card heading="[[title]]" alt="NO TITLE PORVIDED">
        <div class="card-content">
          <div id="titlebar">
            <div class="oneline" id="card-title">
              <h3>[[title]]</h3>
            </div>
            <div class="oneline" id="indicator">
              [[time]]'<iron-icon icon="image:timer" id="time-icon" on-click="_dispatchBackClickedEvent"></iron-icon>
            </div>
          </div>
          <div class="description">[[description]]</div>
        </div>
      </paper-card>
    `;
  }

  static get properties() {
    return {
      title: {
        type: String
      }
    };
  }

  ready() {
    super.ready();
  }
}

window.customElements.define(SuggestionElement.is, SuggestionElement);
