import * as vscode from "vscode";
import * as fs from "fs";
import { getWebviewContent } from "./actions";

let panel: vscode.WebviewPanel | undefined = undefined;
let dispose: vscode.Disposable | undefined = undefined;

export const update = async (editor?: Pick<vscode.TextEditor, "document">) => {
  if (!editor || !panel) return;
  const filePath = editor.document.uri.fsPath;
  const fileName = vscode.workspace.asRelativePath(filePath);
  if (!filePath.endsWith(".tsx")) {
    panel.webview.html = getWebviewContent({ img: "", fileName });
    return;
  }
  try {
    const png = filePath.replace(/\.tsx$/, ".png");
    console.log({ png });
    await fs.promises.access(png, fs.constants.R_OK);
    console.log("update webview");
    let imageUri = vscode.Uri.file(png);
    console.log({ imageUri });
    const src = panel.webview.asWebviewUri(imageUri);
    console.log({ src });
    panel.webview.html = getWebviewContent({
      img: src.toString(),
      fileName,
    });
  } catch (e) {
    panel.webview.html = getWebviewContent({ img: "", fileName });
  }
};

export const yedaStart = () => {
  if (!panel) {
    // const actif = vscode.window.activeTextEditor?.document;
    // const dispo = vscode.window.onDidChangeActiveTextEditor((editor) => {
    //   console.warn(`-------------------onDidChangeActiveTextEditor----------------actif:----------`);
    //   // focus back on tsx doc
    //   const actifs = vscode.window.tabGroups.all.filter(a => a.activeTab);
    //   console.warn(actifs[0].activeTab?.label);
    //   if (actifs[0].activeTab) {
    //     vscode.window.showTextDocument(vscode.window.activeTextEditor.document);
    //   }
    //   // .forEach(a => a.tabs.forEach(b => b.editor.show()));
    //   // console.warn(vscode.window.tabGroups.all.map(a => ({ "actif": a.activeTab, viewColumn: a.viewColumn, size:a.tabs.length})));
    //   dispo.dispose();
    // })
    panel = vscode.window.createWebviewPanel(
      "preview",
      "componant preview",
      vscode.ViewColumn.Beside,
      {},
    );
    
    panel.onDidDispose(() => {
      panel = undefined;
      if (dispose) {
        dispose.dispose();
        dispose = undefined;
      }
    });
  }

  if (!dispose) {
    dispose = vscode.window.onDidChangeActiveTextEditor(update);
    update(vscode.window.activeTextEditor);
  }
};
