import * as vscode from "vscode";
import { update, yedaStart } from "./yedaStart";

export function activate(context: vscode.ExtensionContext) {
  vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
    // ['uri', 'fileName', 'isUntitled', 'languageId', 'version', 'isClosed', 'isDirty', 'save', 'getText', 'eol', 'lineCount', 'lineAt', 'offsetAt', 'positionAt', 'validateRange', 'validatePosition', 'getWordRangeAtPosition']
    // console.log("->> onDidOpenTextDocument", Object.keys(document));
    // console.log("->> document.fileName", document.fileName);
    if (document.fileName.endsWith(".tsx")) {
      // console.log("It's a tsx !!", document.fileName);
      yedaStart();
      // update({ document });
    }
  });

  // vscode.workspace.onDidChangeTextDocument(
  //   (event: vscode.TextDocumentChangeEvent) => {
  //     console.log("->> onDidChangeTextDocument");
  //     const document = event.document;
  //     if (document.fileName.endsWith(".tsx")) {
  //       update({ document });
  //     }
  //   },
  // );

  context.subscriptions.push(
    vscode.commands.registerCommand("yeda.start", yedaStart),
  );
}
