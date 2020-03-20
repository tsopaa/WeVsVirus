import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { setPassiveTouchGestures, setRootPath } from "@polymer/polymer/lib/utils/settings.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/paper-button/paper-button.js";

import { store } from "./store.js";
import { updateAccessible } from "./actions/app.js";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }
        .random-btn {
          background-color: darkgreen;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40%;
        }

        @media (max-width: 700px) {
          .random-btn {
            width: 80%;
          }
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"> </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"> </app-route>

      <paper-button class="random-btn" on-click="_generateRandomTodo">Random</paper-button>
    `;
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();
  }

  _generateRandomTodo() {
    alert("I'm a random todo");
  }
}

window.customElements.define("my-app", MyApp);
