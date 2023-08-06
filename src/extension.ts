import * as vscode from "vscode";
import { getExistingPng, update, yedaStart } from "./yedaStart";

export function activate(context: vscode.ExtensionContext) {
  let prevGitUri = "";
  vscode.workspace.onDidOpenTextDocument(
    async (document: vscode.TextDocument) => {
      // ['uri', 'fileName', 'isUntitled', 'languageId', 'version', 'isClosed', 'isDirty', 'save', 'getText', 'eol', 'lineCount', 'lineAt', 'offsetAt', 'positionAt', 'validateRange', 'validatePosition', 'getWordRangeAtPosition']
      // console.log("->> onDidOpenTextDocument", Object.keys(document));
      // console.log("->> document.fileName", document.fileName);
      // console.log("languageId:", document.languageId);
      const { scheme } = document.uri;
      if (scheme === "git") {
        prevGitUri = document.uri.path
        return;
      }
      // if (prevGitUri && prevGitUri === document.uri.path) {
      //   prevGitUri = "";
      //   return;
      // }
      // console.log(document.uri);
      // console.log("document.languageId", document.languageId);
      const png = await getExistingPng(document.fileName);
      if (png) {
        yedaStart(png);
      }
    },
  );

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
