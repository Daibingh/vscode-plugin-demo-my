import { stdout } from 'process';
import * as vscode from 'vscode';
const child_process = require('child_process');
const path = require('path');

export function replmacroCallback(uri: any) {
    if (!vscode.window.activeTextEditor) {
        return;
    }
    const fileName: string = vscode.window.activeTextEditor.document.fileName;
    child_process.exec(`python ${__dirname}/helper.py ${fileName}`, (err:any, stdout:string, stderr:string) => {
        if (err) {
            console.log(`err: ${err}`);
            return;
        }
        let obj: any = JSON.parse(stdout);
        if (!vscode.window.activeTextEditor) {
            return;
        }
        if (obj.occur === 0)
        {
            vscode.window.showInformationMessage("cant not find patten!");
            return;
        }
        vscode.window.activeTextEditor.edit(editBuilder => {
            if (!vscode.window.activeTextEditor) {
                return;
            }
            const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
            const text = obj.content;
            editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
        });
        vscode.window.showInformationMessage(`find pattern ${obj.patten} ${obj.occur} times, replace with ${obj.repl}`);
    });
}; 