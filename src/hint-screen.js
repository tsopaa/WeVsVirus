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
          overflow: hidden;
        }
        .conny-img {
          height: 400px;
          width: 400px;
          position: absolute;
          top: 50px;
          right: 100px;
        }

        .start-text {
          color: white;
          font-size: 32px;
          text-align: left;
          width: calc(90% - 500px);
          margin-left: 10%;
        }
        .start-text--top {
          margin: 5% 0 5% 10%;
        }
        .start-text--bottom {
          margin: 0 0 5% 10%;
        }

        @media (max-width: 900px) {
          .conny-img {
            height: 90vw;
            width: 90vw;
            margin-top: -40px;
            margin-left: 50px;
            position: relative;
            top: 0;
            right: 0;
          }
          .start-text {
            font-size: 19px;
            text-align: left;
            margin: 0;
          }
          .start-text--top {
            width: 85vw;
            margin: 10% 5% 5% 10vw;
          }
          .start-text--bottom {
            margin: 5% 5% 5% 10vw;
            width: 85vw;
          }
        }
      </style>

      <div id="startHint" on-click="_dispatchHintClickedEvent">
        <div class="start-text start-text--top">
          Helfen Sie dabei die Verbreitung des Corona-Virus zu stoppen und bleiben Sie Zuhause!
        </div>
        <div class="start-text start-text--bottom">
          Damit Ihnen genau das erleichtert wird und Ihnen nicht langweilig ist, sind hier einige Vorschläge, was Sie
          Zuhause alles tun können. Und ganz nebenbei können Sie Conny die Corona-Vire bekämpfen.
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
