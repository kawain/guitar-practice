document.write(`
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
<ul class="navbar-nav mr-auto">
<li class="nav-item${active[0]}">
<a class="nav-link" href="index.html">HOME</a>
</li>
<li class="nav-item${active[1]}">
<a class="nav-link" href="basic.html">指板の音</a>
</li>
<li class="nav-item${active[2]}">
<a class="nav-link" href="triad.html">トライアド</a>
</li>
<li class="nav-item${active[3]}">
<a class="nav-link" href="chord.html">コード</a>
</li>
<li class="nav-item${active[4]}">
<a class="nav-link" href="scale.html">スケール</a>
</li>
</ul>
<ul class="navbar-nav">
<li class="nav-item">
<button class="btn btn-primary" id="close-btn">閉じる</button>
</li>
</ul>
</nav>
`);