import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { setPassiveTouchGestures, setRootPath } from "@polymer/polymer/lib/utils/settings.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "@polymer/paper-icon-button/paper-icon-button.js";

import { store } from "./store.js";
import { updateAccessible } from "./actions/app.js";

import "./startpage-screen.js";
import "./suggestion-screen.js";
import "./timer-screen.js";
import "./conny-healthbar.js";
import "./end-screen.js";
import "./hint-screen.js";
import "./custom-suggestion.js";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(AppGlobals.rootPath);

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
          position: relative;
          margin-top: 64px;
        }
        app-toolbar {
          top: 0;
          position: fixed;
          width: 100%;
          border-bottom: 1px solid white;
          background-color: black;
          z-index: 1;
        }
        #toolbarTitle {
          width: 100%;
          position: relative;
        }
        .title {
          color: white;
          position: relative;
          left: calc(50% - 40px);
          transform: translateX(-50%);
          display: inline-block;
          font-size: 26px;
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
      <app-drawer-layout force-narrow>
        <app-drawer id="drawer">
          Ich bin ein drawer
        </app-drawer>
        <app-toolbar>
          <div id="toolbarTitle">
            <paper-icon-button
              icon="menu"
              drawer-toggle
              style="color: white;"
              on-click="_openDrawer"
            ></paper-icon-button>
            <div class="title" main-title="">Quarantin0</div>
          </div>
          <conny-healthbar id="healthBar" health="{{health}}" style="display: none;"></conny-healthbar>
        </app-toolbar>
        <div id="screen" class="screen">
          <hint-screen id="hintScreen" class="screen"></hint-screen>
          <startpage-screen
            id="startpageScreen"
            categories="[[categories]]"
            suggestions="[[suggestions]]"
            style="display: none;"
          ></startpage-screen>
          <suggestion-screen
            id="suggestionScreen"
            class="screen"
            suggestions="[[filteredSuggestions]]"
            style="display: none;"
          >
          </suggestion-screen>
          <timer-screen id="timerScreen" health="{{health}}" style="display: none;"></timer-screen>
          <custom-suggestion id="customSuggestionScreen" style="display: none;"></custom-suggestion>
          <end-screen id="endScreen" health="[[health]]" style="display: none;"></end-screen>
        </div>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      suggestions: {
        type: Object,
        observer: "_assignCategories"
      },
      filteredSuggestions: {
        type: Object,
        value() {
          return [];
        }
      },
      catgeories: {
        type: Object
      },
      checkedCategories: {
        type: Object,
        value() {
          return [];
        }
      },
      health: {
        type: Number,
        value: 100
      }
    };
  }

  ready() {
    super.ready();

    this.$.hintScreen.addEventListener("hint-clicked", this._showStartPageScreen.bind(this));
    this.$.startpageScreen.addEventListener("random-btn-clicked", evt => {
      this._showSuggestions();
    });

    this.$.startpageScreen.addEventListener("category-checked", evt => {
      if (!this.checkedCategories.find(el => el === evt.detail.name)) {
        this.set("checkedCategories", [...this.checkedCategories, evt.detail.name]);
      }
    });

    this.$.startpageScreen.addEventListener("category-unchecked", evt => {
      this.set(
        "checkedCategories",
        this.checkedCategories.filter(el => el !== evt.detail.name)
      );
    });

    this.$.startpageScreen.addEventListener("show-add-suggestion", evt => {
      this._showCustomSuggestionScreen();
    });
    this.$.customSuggestionScreen.addEventListener("add-suggestion", evt => {
      this.set("suggestions", [
        ...this.suggestions,
        {
          id: this.suggestions.length + 1,
          name: evt.detail.title,
          time: evt.detail.time,
          description: evt.detail.description
        }
      ]);
    });

    this.$.timerScreen.addEventListener("timer-finished", () => {
      this._showEndScreen();
    });
    this.$.timerScreen.addEventListener("back-clicked", this._showStartPageScreen.bind(this));

    this.$.endScreen.addEventListener("back-clicked", this._showStartPageScreen.bind(this));

    this.$.suggestionScreen.addEventListener("back-clicked", this._showStartPageScreen.bind(this));

    this.$.suggestionScreen.addEventListener("item-clicked", evt => {
      this.$.timerScreen.time = evt.detail.time;
      this.$.timerScreen.title = evt.detail.name;
      this._showTimerScreen();
    });
  }

  _openDrawer() {
    if (this.$.drawer.opened) {
      this.$.drawer.close();
    } else {
      this.$.drawer.open();
    }
  }

  _showSuggestions() {
    if (this.checkedCategories.length > 0) {
      let filteredSuggestions = [];
      this.checkedCategories.forEach(checkedCategory => {
        filteredSuggestions = [
          ...filteredSuggestions,
          ...this.suggestions.filter(suggestion => suggestion.categories.find(category => category === checkedCategory))
        ];
      });
      this.set(
        "filteredSuggestions",
        filteredSuggestions.filter((item, index) => filteredSuggestions.indexOf(item) === index)
      );
    } else {
      this.set("filteredSuggestions", this.suggestions);
    }
    this._showSuggestionScreen();
  }

  _showEndScreen() {
    this.$.endScreen.style.display = "block";
    this.$.hintScreen.style.display = "none";
    this.$.timerScreen.style.display = "none";
    this.$.startpageScreen.style.display = "none";
    this.$.suggestionScreen.style.display = "none";
    this.$.customSuggestionScreen.style.display = "none";
    this.$.toolbarTitle.style.display = "none";
    this.$.healthBar.style.display = "block";
  }

  _showTimerScreen() {
    this.$.timerScreen.startTimer();
    this.$.timerScreen.style.display = "block";
    this.$.hintScreen.style.display = "none";
    this.$.endScreen.style.display = "none";
    this.$.startpageScreen.style.display = "none";
    this.$.suggestionScreen.style.display = "none";
    this.$.customSuggestionScreen.style.display = "none";
    this.$.toolbarTitle.style.display = "none";
    this.$.healthBar.style.display = "block";
  }

  _showSuggestionScreen() {
    this.$.suggestionScreen.style.display = "block";
    this.$.hintScreen.style.display = "none";
    this.$.endScreen.style.display = "none";
    this.$.startpageScreen.style.display = "none";
    this.$.timerScreen.style.display = "none";
    this.$.customSuggestionScreen.style.display = "none";
    this.$.toolbarTitle.style.display = "none";
    this.$.healthBar.style.display = "block";
  }

  _showStartPageScreen() {
    this.$.startpageScreen.style.display = "block";
    this.$.hintScreen.style.display = "none";
    this.$.endScreen.style.display = "none";
    this.$.suggestionScreen.style.display = "none";
    this.$.timerScreen.style.display = "none";
    this.$.customSuggestionScreen.style.display = "none";
    this.$.toolbarTitle.style.display = "none";
    this.$.healthBar.style.display = "block";
  }

  _showCustomSuggestionScreen() {
    this.$.customSuggestionScreen.style.display = "block";
    this.$.hintScreen.style.display = "none";
    this.$.endScreen.style.display = "none";
    this.$.startpageScreen.style.display = "none";
    this.$.suggestionScreen.style.display = "none";
    this.$.timerScreen.style.display = "none";
    this.$.toolbarTitle.style.display = "none";
    this.$.healthBar.style.display = "none";
  }

  _showHintScreen() {
    this.$.hintScreen.style.display = "block";
    this.$.customSuggestionScreen.style.display = "none";
    this.$.endScreen.style.display = "none";
    this.$.startpageScreen.style.display = "none";
    this.$.suggestionScreen.style.display = "none";
    this.$.timerScreen.style.display = "none";
    this.$.toolbarTitle.style.display = "block";
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
}

window.customElements.define(Quarantino.is, Quarantino);
