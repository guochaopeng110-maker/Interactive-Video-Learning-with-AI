import Link from 'next/link';
import { LessonFlowPanel, Surface } from '../../components/PrototypeBlocks';
import { lessonNodes } from '../../components/prototype-data';

const previewChecklist = [
  '用学生视角预演主线与错误后分支，而不是停留在静态页面检查。',
  '确认 GroundedAssistant 的教材引用足够清晰，不让学生误解为开放式聊天。',
  '确认补救分支结束后能回到主线，且不会泄露教师草稿信息。',
];

export default function TeacherLessonPreviewPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Teacher Lesson Preview"
        accent="#4F46E5"
        title="预览页必须像 student flow，而不是作者后台"
        description="这里是 #21 的第二个重点。教师看到的是学生式 lesson stage、分支回路和 GroundedAssistant 使用情境，再决定是否发布。"
      >
        <LessonFlowPanel nodes={lessonNodes} mode="teacher-preview" accent="#0F766E" />
      </Surface>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <Surface
          eyebrow="Preview Checklist"
          accent="#4F46E5"
          title="发布前检查的是学习体验，不只是字段完整性"
          description="Preview 的任务是提前暴露学生会经历的节奏、分支和补救路径，避免把有问题的 Lesson 直接推给 student workspace。"
        >
          <div className="space-y-3">
            {previewChecklist.map((item) => (
              <div key={item} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </Surface>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">After Publish</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            一旦发布，这个 Lesson 将进入学生流，并在 analytics 中产出掉点、弱点与复习效果信号，形成教师迭代入口。
          </p>
          <Link
            href="/prototype/teacher/analytics"
            className="mt-5 inline-flex rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            查看教学分析
          </Link>
        </aside>
      </section>
    </div>
  );
}
