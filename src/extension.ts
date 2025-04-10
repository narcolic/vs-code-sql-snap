// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { queryBlockRunner } from "./queryBlockRunner";
import { queryResultsToggle } from "./queryResultsToggle";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable_queryBlockRunner = vscode.commands.registerCommand("extension.queryBlockRunner", async () => {
        await queryBlockRunner();
    });
 
    let disposable_queryResultsToggle = vscode.commands.registerCommand('extension.queryResultsToggle', async () => {
        await queryResultsToggle();
    });
	
    context.subscriptions.push(
        disposable_queryBlockRunner, 
        disposable_queryResultsToggle
    );
}

// This method is called when your extension is deactivated
export function deactivate() { }