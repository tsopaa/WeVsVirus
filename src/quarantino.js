import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { setPassiveTouchGestures, setRootPath } from "@polymer/polymer/lib/utils/settings.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-ajax/iron-ajax.js";

import { store } from "./store.js";
import { updateAccessible } from "./actions/app.js";

import "./startpage-screen.js";
import "./suggestion-screen.js";
import "./timer-screen.js";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class Quarantino extends PolymerElement {
  static get is() {
    return "quarantino-app";
  }
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }
        .screen {
          background-color: black;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      </style>

      <iron-ajax
        id="suggestionsReader"
        auto
        url="res/suggestions.json"
        handle-as="json"
        on-response="_setSuggestions"
      ></iron-ajax>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"> </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"> </app-route>
      <div id="screen" class="screen">
        <startpage-screen id="startpageScreen" categories="[[categories]]"></startpage-screen>
        <suggestion-screen id="suggestionScreen" suggestions="[[suggestions]]" style="display: none;">
        </suggestion-screen>
        <timer-screen id="timerScreen" style="display: none;"></timer-screen>
      </div>
    `;
  }

  static get properties() {
    return {
      suggestions: {
        type: Object,
        observer: "_assignCategories"
      },
      catgeories: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
    this.$.startpageScreen.addEventListener("random-btn-clicked", evt => {
      this.$.startpageScreen.style.display = "none";
      this.$.suggestionScreen.style.display = "block";
      this.$.timerScreen.style.display = "none";
    });

    this.$.suggestionScreen.addEventListener("back-clicked", this._resetToStartPage.bind(this));

    this.$.timerScreen.addEventListener("back-clicked", this._resetToStartPage.bind(this));

    this.$.suggestionScreen.addEventListener("item-clicked", evt => {
      this.$.timerScreen.time = evt.detail.time;
      this.$.timerScreen.title = evt.detail.name;
      this.$.startpageScreen.style.display = "none";
      this.$.suggestionScreen.style.display = "none";
      this.$.timerScreen.style.display = "block";
    });
  }

  _setSuggestions() {
    if (this.$.suggestionsReader.lastResponse && this.$.suggestionsReader.lastResponse.suggestions)
      this.suggestions = this.$.suggestionsReader.lastResponse.suggestions;
  }

  _assignCategories() {
    this.categories = [];
    if (this.suggestions) {
      this.suggestions.forEach(suggestion => {
        suggestion.categories.forEach(category => {
          if (!this.categories.find(el => el === category)) {
            this.categories.push(category);
          }
        });
      });
    }
  }

  _resetToStartPage() {
    this.$.startpageScreen.style.display = "block";
    this.$.suggestionScreen.style.display = "none";
    this.$.timerScreen.style.display = "none";
  }
}

window.customElements.define(Quarantino.is, Quarantino);
