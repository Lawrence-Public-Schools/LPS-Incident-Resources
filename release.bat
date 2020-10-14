@echo off
git archive --format zip --output dists\LPS-Discipline-Resources-1.3.zip --worktree-attributes --verbose -9 HEAD
pause