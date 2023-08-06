import * as vscode from "vscode";

export interface ActionProps {
  img: string;
  fileName: string;
}

export function getWebviewContent(props: ActionProps) {
  const { img, fileName } = props;
  const themeKind = vscode.window.activeColorTheme.kind;

  let backgroundColor;
  switch (themeKind) {
    case vscode.ColorThemeKind.Light:
      backgroundColor = "white";
      break;
    case vscode.ColorThemeKind.Dark:
      backgroundColor = "black";
      break;
    case vscode.ColorThemeKind.HighContrast:
      backgroundColor = "black";
      break;
  }

  if (!img) {
    return `<!DOCTYPE html><body>no preview image for ${fileName}</body>`;
  }

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                height: 100vh;
                overflow: hidden;
                background-color: ${backgroundColor};
            }
            img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
        </style>
    </head>
    <body>
        <img src="${img}" />
    </body>
    </html>`;
}
