import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/av-icons.js";


class SuggestionElement extends PolymerElement {
  static get is() {
    return "suggestion-element";
  }
  static get template() {
    return html `
      <style>
        :host {
          display: block;
        }
        h2 {
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .card-actions{
          margin-top: 2px;
        }
        #indicator{
          width: 20%;
          text-align: right;
        }
        #card-title{
          width: 70%;
        }
        .oneline {
          display: inline-block;
        }
        @media (max-width: 700px) {
        }
      </style>
        <paper-card heading="[[title]]" alt="NO TITLE PORVIDED">
          <div class="card-content">
          <div id="titlebar">
            <div class="oneline" id="card-title">
              <h2 >[[title]]</h2>
            </div>
            <div class="oneline" id="indicator">
              <iron-icon icon="av:av-timer" on-click="_dispatchBackClickedEvent"></iron-icon> 300
            </div>
          </div>
            
            [[description]]
          </div>
          <div class="card-actions">
            
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