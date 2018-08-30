using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testJSApp.Models
{
    public class EFQuestionRepository : IQuestionRepository
    {
        private ApplicationDbContext context;

        public EFQuestionRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        public IQueryable<QuestionEntity> QuestionEntities => context.QuestionEntities;
    }
}
