import Cytoscape from 'cytoscape';

export default function renderGraph(graph) {
    var users = [];
    var nodes = [];
    var edges = [];

    for(var address in graph) {
        users.push({
            address,
            approvals: graph[address].approvals,
            disapprovals: graph[address].disapprovals
        });
    }

    users.forEach((user, index) => {
        nodes.push({
            data: { id: user.address, name: user.address.slice(-4)}
        });
        user.approvals.forEach(approval => {
            edges.push({
                data: { source: user.address, target: approval, color: '#08dd4f' }
            });
        });
        user.disapprovals.forEach(disapproval => {
            edges.push({
                data: { source: user.address, target: disapproval, color: '#ff2828' }
            });
        });
    });

    Cytoscape({
      container: document.getElementById('user-graph'), // container to render in,

      layout: {
        name: 'cose',
        padding: 10,
        randomize: true
      },

      style: Cytoscape.stylesheet()
        .selector('node')
          .css({
            'shape': 'circle',
            'width': '50',
            'height': '50',
            'content': 'data(name)',
            'text-valign': 'center',
            'background-color': '#bbb',
            'color': '#444'
          })
        .selector(':selected')
          .css({
            'background-color': '#fff',
            'box-shadow': '0 0 4px #fff'
          })
        .selector('edge')
          .css({
            'curve-style': 'bezier',
            'opacity': 0.666,
            'width': '4',
            'target-arrow-shape': 'triangle',
            'source-arrow-shape': 'circle',
            'line-color': 'data(color)',
            'source-arrow-color': 'data(color)',
            'target-arrow-color': 'data(color)'
          }),

      elements: {edges, nodes},

      ready: function(){
        window.cy = this;
      }
  });
}
