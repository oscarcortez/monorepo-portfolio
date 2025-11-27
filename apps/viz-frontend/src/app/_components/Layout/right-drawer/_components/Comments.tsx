import { JSX, useState } from 'react';
import { motion } from 'framer-motion';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

const comments: Comment[] = [
  { id: '1', author: 'John Doe', text: 'Great site! Love the design.', timestamp: '2 hours ago', avatar: 'JD' },
  { id: '2', author: 'Jane Smith', text: 'Amazing work, very clean UI.', timestamp: '4 hours ago', avatar: 'JS' },
  {
    id: '3',
    author: 'Alex Johnson',
    text: 'Impressed with the functionality.',
    timestamp: '1 day ago',
    avatar: 'AJ',
  },
  { id: '4', author: 'Maria Garcia', text: 'Professional and modern design.', timestamp: '2 days ago', avatar: 'MG' },
  { id: '5', author: 'Chris Wilson', text: 'Excellent portfolio showcase!', timestamp: '3 days ago', avatar: 'CW' },
];

export function Comments(): JSX.Element {
  const [newComment, setNewComment] = useState('');
  const lastComments = comments.slice(0, 5);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    // Lógica para enviar el comentario
    // eslint-disable-next-line no-console
    console.log('Comment:', newComment);
    setNewComment('');
  };

  return (
    <>
      <div>
        {lastComments.length > 0 ? (
          <div className="space-y-4">
            {lastComments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm text-foreground">{comment.author}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground/70 mt-1 break-words">{comment.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">No comments yet</div>
        )}
      </div>

      <div className="border-t p-4 bg-muted/10 space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment here..."
          className="w-full p-3 rounded-lg bg-background border border-cyan-800 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-cyan-600 resize-none"
          rows={3}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmitComment}
          disabled={!newComment.trim()}
          className="w-full px-4 py-2 rounded-lg bg-primary dark text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          Send Comment
        </motion.button>
      </div>
    </>
  );
}
