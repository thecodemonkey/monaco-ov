import { LspClient } from "./client/LspClient";
import { MonacoClientCreator } from "./client/MonacoClient";
import { MonacoOvConfiguration } from "./monaco-configuration/MonacoOvConfiguration";
import { LanguageEnum, CultureEnum } from "ov-language-server-types";

require("../css/style.css");
require("../images/logo-v2.png");
require("../images/logo.png");

require("monaco-editor");
(self as any).MonacoEnvironment = {
  getWorkerUrl: (moduleId: any, label: string) => {
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  }
};

createEditors();
createOptions();

/**
 * Creates all required monaco- and lsp-clients and sets up the configuration for openVALIDATION
 */
async function createEditors() {
  MonacoOvConfiguration.setOvLanguageSupport();

  const ovlEditor = await MonacoClientCreator.createOvlEditor();
  const schemaEditor = await MonacoClientCreator.createSchemaEditor();
  const outputEditor = await MonacoClientCreator.createOutputEditor();
  LspClient.createLspClient(ovlEditor, schemaEditor, outputEditor);
}

function createOptions() {
  const languageSelectBox = document.getElementById(
    "languageSelectBox"
  ) as HTMLSelectElement;
  for (let [key, value] of Object.entries(LanguageEnum)) {
    let option = document.createElement("option");
    option.text = key;
    option.value = value;
    languageSelectBox.add(option);
  }

  const cultureSelectBox = document.getElementById(
    "cultureSelectBox"
  ) as HTMLSelectElement;
  for (let [key, value] of Object.entries(CultureEnum)) {
    let option = document.createElement("option");
    option.text = key;
    option.value = value;
    cultureSelectBox.add(option);
  }
}
