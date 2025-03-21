// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { runQueryBlock } from "./queryBlockRunner";
import { toggleQueryResults } from "./queryResultsToggle";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let disposable_runQueryBlock = vscode.commands.registerCommand("extension.runQueryBlock", async () => {
        await runQueryBlock();
    });
 
	let disposable_toggleQueryResults = vscode.commands.registerCommand('extension.toggleQueryResults', async () => {
        await toggleQueryResults();
    });
	
	context.subscriptions.push(disposable_runQueryBlock, disposable_toggleQueryResults);
}

// This method is called when your extension is deactivated
export function deactivate() { }