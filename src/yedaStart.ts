import * as vscode from "vscode";
import * as fs from "fs";
import { getWebviewContent } from "./actions";

let panel: vscode.WebviewPanel | undefined = undefined;
let dispose: vscode.Disposable | undefined = undefined;

export const getExistingPng = async (filePath: string): Promise<string> => {
  if (!filePath.endsWith(".tsx")) {
    return "";
  }
  try {
    const png = filePath.replace(/\.tsx$/, ".png");
    await fs.promises.access(png, fs.constants.R_OK);
    return png;
  } catch (e) {
    return "";
  }
};

export const update = async (
  editor?: Pick<vscode.TextEditor, "document">,
  png?: string,
) => {
  if (!panel) return;
  let fileName = "png";
  if (!png) {
    if (!editor) return;
    const filePath = editor.document.uri.fsPath;
    fileName = vscode.workspace.asRelativePath(filePath);
    png = await getExistingPng(filePath);
    // console.log("update called png:", png, "fileName:", fileName);
    if (!png) {
      panel.webview.html = getWebviewContent({ img: "", fileName });
      return;
    }
  } else {
  }
  let imageUri = vscode.Uri.file(png);
  // console.log({ imageUri });
  const src = panel.webview.asWebviewUri(imageUri);
  // console.log(`convert ${png} to ${src}`);
  panel.webview.html = getWebviewContent({ img: src.toString(), fileName });
};

export const yedaStart = (png: string) => {
  if (!panel) {
    panel = vscode.window.createWebviewPanel(
      "preview",
      "🔴🟢🔵componant🔴🟢🔵",
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
    const activeTextEditor = vscode.window.activeTextEditor;
    dispose = vscode.window.onDidChangeActiveTextEditor(update, png);
    const evs = panel.onDidChangeViewState((aa) => {
      update(activeTextEditor, png);
      evs.dispose();
    });
  }
};
