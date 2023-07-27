import * as vscode from "vscode";
import { update, yedaStart } from "./yedaStart";

export function activate(context: vscode.ExtensionContext) {
  console.log("activate onDidOpenTextDocument");
  //  vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
  //	console.log("onDidOpenTextDocument", document)
  //    if (document.fileName.endsWith(".tsx")) {
  //      update({ document });
  //    }
  //  });

  vscode.workspace.onDidChangeTextDocument(
    (event: vscode.TextDocumentChangeEvent) => {
      const document = event.document;
      console.log("onDidOpenTextDocument", document);
      if (document.fileName.endsWith(".tsx")) {
        update({ document });
      }
    },
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("yeda.start", yedaStart),
  );
}
