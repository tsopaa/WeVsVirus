import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class HintScreen extends PolymerElement {
  static get is() {
    return "hint-screen";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: flex;
        }
        .conny-img {
          height: 380px;
          width: 380px;
          /* position: absolute; */

          bottom: 10px;
          right: -80px;
        }
        .start-text {
          color: white;
          font-size: 20px;
          text-align: left;
        }
        .start-text--top {
          width: 90%;
          margin: 10% 5% 5% 5%;
        }
        .start-text--bottom {
          margin: 5% 5% 5% 5%;
          width: 90%;
        }

        @media (max-width: 700px) {
        }
      </style>

      <div id="startHint" on-click="_dispatchHintClickedEvent">
        <div class="start-text start-text--top">
          Helfen Sie dabei die Verbreitung des Corona-Virus zu stoppen und bleiben Sie Zuhause!
        </div>
        <div class="start-text start-text--bottom">
          Damit Ihnen genau das erleichtert wird und Ihnen nicht langweilig ist, sind hier einige Vorschläge, was Sie Zuhause alles tun können. Und ganz nebenbei können Sie Conny die
          Corona-Vire bekämpfen.
        </div>
        <img class="conny-img" src="res/conny.png" />
      </div>
      ;
    `;
  }

  static get properties() {
    return {
      categories: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
  }

  _dispatchHintClickedEvent() {
    this.dispatchEvent(new CustomEvent("hint-clicked"));
  }
}

window.customElements.define(HintScreen.is, HintScreen);
