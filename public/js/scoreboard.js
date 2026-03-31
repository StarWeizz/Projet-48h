(function (global) {
  'use strict';

  var PSEUDO_KEY = 'quiz48h_pseudo';
  var SCORES_KEY = 'quiz48h_scores';

  function getApiBase() {
    if (typeof window === 'undefined') return '/api';
    return window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api';
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function fetchWithTimeout(url, options, ms) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () { reject(new Error('timeout')); }, ms || 3000);
      fetch(url, options).then(function (r) { clearTimeout(timer); resolve(r); }, function (e) { clearTimeout(timer); reject(e); });
    });
  }

  var Quiz48h = {
    getPseudo: function () {
      return localStorage.getItem(PSEUDO_KEY) || '';
    },
    setPseudo: function (name) {
      var trimmed = String(name).trim().slice(0, 30);
      if (trimmed) localStorage.setItem(PSEUDO_KEY, trimmed);
      return trimmed;
    },
    saveScore: function (challengeSlug, challengeName, score, maxScore) {
      var playerName = this.getPseudo() || 'Anonyme';
      var entry = { playerName: playerName, challengeSlug: challengeSlug, challengeName: challengeName, score: score, maxScore: maxScore, date: new Date().toISOString() };

      var local = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
      local.push(entry);
      localStorage.setItem(SCORES_KEY, JSON.stringify(local.slice(-200)));

      fetchWithTimeout(getApiBase() + '/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }, 3000).catch(function () {});
    },
    getScores: function (challengeSlug) {
      var self = this;
      return fetchWithTimeout(getApiBase() + '/scores/' + encodeURIComponent(challengeSlug), {}, 3000)
        .then(function (res) {
          if (!res.ok) throw new Error('not ok');
          return res.json();
        })
        .then(function (data) { return data.scores || []; })
        .catch(function () {
          var local = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
          return local
            .filter(function (s) { return s.challengeSlug === challengeSlug; })
            .sort(function (a, b) { return b.score - a.score; })
            .slice(0, 10)
            .map(function (s) { return { playerName: s.playerName, score: s.score, maxScore: s.maxScore }; });
        });
    },
    getAllScores: function () {
      return fetchWithTimeout(getApiBase() + '/scores', {}, 3000)
        .then(function (res) {
          if (!res.ok) throw new Error('not ok');
          return res.json();
        })
        .then(function (data) { return data.scores || []; })
        .catch(function () {
          var local = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
          var seen = {};
          var deduped = [];
          local.forEach(function (s) {
            var key = s.challengeSlug + ':' + s.playerName;
            if (!seen[key] || seen[key].score < s.score) {
              seen[key] = s;
            }
          });
          Object.keys(seen).forEach(function (k) { deduped.push(seen[k]); });
          return deduped.sort(function (a, b) { return b.score - a.score; }).slice(0, 100);
        });
    },
    renderScoreList: function (scores, containerEl) {
      if (!containerEl) return;
      if (!scores || scores.length === 0) {
        containerEl.innerHTML = '<p style="color:#888;font-style:italic;margin:0.5em 0;">Aucun score enregistré pour ce défi.</p>';
        return;
      }
      var html = '<table style="width:100%;border-collapse:collapse;font-size:0.88em;">';
      html += '<thead><tr style="border-bottom:2px solid #18bfef;">';
      html += '<th style="text-align:left;padding:5px 8px;color:#18bfef;">#</th>';
      html += '<th style="text-align:left;padding:5px 8px;color:#18bfef;">Joueur</th>';
      html += '<th style="text-align:right;padding:5px 8px;color:#18bfef;">Score</th>';
      html += '</tr></thead><tbody>';
      scores.forEach(function (s, i) {
        var medal = i === 0 ? '🥇 ' : i === 1 ? '🥈 ' : i === 2 ? '🥉 ' : (i + 1) + '.';
        var bold = i < 3 ? 'font-weight:700;' : '';
        html += '<tr style="border-bottom:1px solid rgba(0,0,0,0.08);">';
        html += '<td style="padding:5px 8px;color:#888;">' + medal + '</td>';
        html += '<td style="padding:5px 8px;' + bold + '">' + escHtml(s.playerName || '?') + '</td>';
        html += '<td style="padding:5px 8px;text-align:right;' + bold + '">' + s.score + (s.maxScore ? '/' + s.maxScore : '') + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table>';
      containerEl.innerHTML = html;
    },
    renderAllScoresGrouped: function (scores, containerEl) {
      if (!containerEl) return;
      if (!scores || scores.length === 0) {
        containerEl.innerHTML = '<p style="color:#888;font-style:italic;">Aucun score enregistré.</p>';
        return;
      }
      var byChallenge = {};
      scores.forEach(function (s) {
        var slug = s.challengeSlug || 'inconnu';
        var name = s.challengeName || slug;
        if (!byChallenge[slug]) byChallenge[slug] = { name: name, entries: [] };
        byChallenge[slug].entries.push(s);
      });
      var html = '';
      Object.keys(byChallenge).forEach(function (slug) {
        var group = byChallenge[slug];
        var top5 = group.entries.slice(0, 5);
        html += '<div style="margin-bottom:1.5em;">';
        html += '<h4 style="margin:0 0 0.5em;color:#18bfef;border-bottom:1px solid #18bfef;padding-bottom:4px;">' + escHtml(group.name) + '</h4>';
        html += '<table style="width:100%;border-collapse:collapse;font-size:0.88em;">';
        top5.forEach(function (s, i) {
          var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
          html += '<tr style="border-bottom:1px solid rgba(0,0,0,0.06);">';
          html += '<td style="padding:4px 6px;width:30px;">' + medal + '</td>';
          html += '<td style="padding:4px 6px;">' + escHtml(s.playerName || '?') + '</td>';
          html += '<td style="padding:4px 6px;text-align:right;">' + s.score + (s.maxScore ? '/' + s.maxScore : '') + '</td>';
          html += '</tr>';
        });
        html += '</table></div>';
      });
      containerEl.innerHTML = html;
    }
  };

  global.Quiz48h = Quiz48h;
})(window);
