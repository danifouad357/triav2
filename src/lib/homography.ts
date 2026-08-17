/**
 * Math utilities for computing perspective projection (homography) matrices.
 * Based on Direct Linear Transformation (DLT).
 */

/**
 * Solves a system of linear equations using Gaussian elimination.
 */
function solveLinearSystem(matrix: number[][]): number[] | null {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        // Find pivot
        let maxRow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = j;
            }
        }
        
        // Swap rows
        const temp = matrix[i];
        matrix[i] = matrix[maxRow];
        matrix[maxRow] = temp;
        
        // Check for singularity
        if (Math.abs(matrix[i][i]) < 1e-10) return null;
        
        // Eliminate
        for (let j = i + 1; j < n; j++) {
            const factor = matrix[j][i] / matrix[i][i];
            for (let k = i; k <= n; k++) {
                matrix[j][k] -= factor * matrix[i][k];
            }
        }
    }
    
    // Back-substitution
    const result = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += matrix[i][j] * result[j];
        }
        result[i] = (matrix[i][n] - sum) / matrix[i][i];
    }
    
    return result;
}

/**
 * Computes a 3x3 homography matrix that maps the unit square [0,1]x[0,1]
 * to the given 4 corners.
 * 
 * src: [[0,0], [1,0], [1,1], [0,1]]
 * dst: [[tl.x, tl.y], [tr.x, tr.y], [br.x, br.y], [bl.x, bl.y]]
 */
export function getHomographyMatrix(dst: [[number, number], [number, number], [number, number], [number, number]]): number[] {
    const src = [[0, 0], [1, 0], [1, 1], [0, 1]];
    const equations: number[][] = [];
    
    for (let i = 0; i < 4; i++) {
        const sx = src[i][0];
        const sy = src[i][1];
        const dx = dst[i][0];
        const dy = dst[i][1];
        
        equations.push([sx, sy, 1, 0, 0, 0, -sx * dx, -sy * dx, dx]);
        equations.push([0, 0, 0, sx, sy, 1, -sx * dy, -sy * dy, dy]);
    }
    
    const h = solveLinearSystem(equations);
    if (!h) {
        // Fallback to identity if degenerate
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    
    // Return in column-major order for WebGL uniformMatrix3fv
    return [
        h[0], h[3], h[6],
        h[1], h[4], h[7],
        h[2], h[5], 1.0
    ];
}
