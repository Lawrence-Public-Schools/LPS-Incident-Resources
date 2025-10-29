@echo off
mkdir dists
git archive --format zip --output dists\LPS-Discipline-Resources.zip --worktree-attributes --verbose -9 HEAD
pause