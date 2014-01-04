
// console.time('dump');
// function walk(x, res) {
//   _.each(x, function(v, k) {
//     if(_.isObject(v)) {
//       res.push(v.length ? '<ul>' : '<li>');
//       walk(v, res);
//       res.push(v.length ? '</ul>' : '</li>');
//     } else {
//       res.push('<p>' + k + ': ' + v + '</p>');
//     }
//   });
//   return res;
// }
// $("#bookmarks").html(walk(db, []).join(''))
// console.timeEnd('dump');

// .replace(/^(\s+)(["\w]+):\s([^\{\[\}\]]+?),?$/gm, '$1<i>$2</i><b>$3</b>')
//               .replace(/^(\s+)?"(\w+)":\s\[$/gm, '$1<ul data-key="$2">')
//               .replace(/^(\s+)?\{/gm, '$1<li>')
//               .replace(/^(\s+)?\},?$/gm, '$1</li>')


// function rgxJson(tree) {
//   var
//     str = JSON.stringify(tree || db, null, 2),
//     html = str.replace(/^(\s+)?(.*?)(\b|"),?$/gm, '$1<p>$2</p>')
//               .replace(/^(\s+)?"(\w+)":\s\[$/gm, '$1<ul data-key="$2">')
//               .replace(/^(\s+)?"(\w+)":\s\{$/gm, '$1<ol data-key="$2">')
//               .replace(/^(\s+)?\{$/gm, '$1<li>')
//               .replace(/^(\s+)?\[$/gm, '$1<ul>')
//               .replace(/^(\s+)?\},?$/gm, '$1</ol>')
//               .replace(/^(\s+)?\],?$/gm, '$1</ul>');
//   $("#bookmarks").html(html);
// }

// rgxJson(tmp);