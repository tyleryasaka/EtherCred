import Cytoscape from 'cytoscape';

export default function renderGraph(users, primaryUserAddress) {
    var nodes = [];
    var edges = [];

    users.forEach((user, index) => {
        var nodeColor = '#000', nodeBackgroundColor = '#ddd';
        if(user.address === primaryUserAddress) {
            nodeColor = '#fff'
            nodeBackgroundColor = '#222';
        }
        nodes.push({
            data: {
                id: user.address,
                name: index + 1,
                color: nodeColor,
                backgroundColor: nodeBackgroundColor
            }
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

      userZoomingEnabled: false,
      userPanningEnabled: false,

      style: Cytoscape.stylesheet()
        .selector('node')
          .css({
            'shape': 'circle',
            'width': '35',
            'height': '35',
            'content': 'data(name)',
            'text-valign': 'center',
            'background-color': 'data(backgroundColor)',
            'color': 'data(color)'
          })
        .selector(':selected').css({}) // maybe eventually do something here
        .selector('edge')
          .css({
            'curve-style': 'bezier',
            'opacity': 0.666,
            'width': '2',
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
