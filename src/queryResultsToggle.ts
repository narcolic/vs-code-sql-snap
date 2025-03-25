import * as vscode from "vscode";

let isResultsVisible = false;

export async function queryResultsToggle() {
    if (isResultsVisible) {
        vscode.commands.executeCommand("workbench.action.togglePanel");
    } else {
        vscode.commands.executeCommand("mssql.revealQueryResultPanel");
    }
    isResultsVisible = !isResultsVisible;
}
