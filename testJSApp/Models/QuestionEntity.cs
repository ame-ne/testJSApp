using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace testJSApp.Models
{
    public class QuestionEntity
    {
        public int Id { get; set; }

        [Display(Name = "Текст вопроса")]
        public string Text { get; set; }

        [Display(Name ="Вопросы")]
        public string Options { get; set; }

        [Display(Name = "Ответы")]
        public string Answers { get; set; }

        [Display(Name = "Время на ответ")]
        public int? Timeout { get; set; }
    }
}
