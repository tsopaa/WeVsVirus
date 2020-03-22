import "@polymer/polymer/polymer-element.js";

const $_documentContainer = document.createElement("template");
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>

          .back-btn {
          height: 40px;
          width: 40px;
          margin-top: 5px;
          margin-left: 5px;
      }
      
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
