import * as vscode from "vscode";

export async function queryBlockRunner() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active SQL editor found.");
        return;
    }

    const document = editor.document;
    const selection = editor.selection;
    let queryText = "";

    if (!selection.isEmpty) {
        // If there's a selection, use it
        queryText = document.getText(selection).trim();
    } else {
        // Otherwise, find the SQL block around the cursor
        const cursorLine = selection.active.line;
        const totalLines = document.lineCount;

        let startLine = cursorLine;
        let endLine = cursorLine;

        // First empty line before the cursor
        while (startLine > 0) {
            const lineText = document.lineAt(startLine - 1).text.trim();
            if (lineText === "") { break; }
            startLine--;
        }

        // First empty line after the cursor
        while (endLine < totalLines - 1) {
            const lineText = document.lineAt(endLine + 1).text.trim();
            if (lineText === "") { break; }
            endLine++;
        }

        // Extract the query text
        const queryRange = new vscode.Range(
            new vscode.Position(startLine, 0),
            new vscode.Position(endLine, document.lineAt(endLine).text.length)
        );
        queryText = document.getText(queryRange).trim();

        editor.selection = new vscode.Selection(queryRange.start, queryRange.end);
    }

    if (!queryText) {
        vscode.window.showErrorMessage("No SQL query found to execute.");
        return;
    }

    await vscode.commands.executeCommand("mssql.runQuery");
}