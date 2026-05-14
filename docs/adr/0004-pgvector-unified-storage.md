# pgvector 一体存储方案

Content Grounding Engine 的核心依赖是向量数据库，用于教材语料库的语义检索（RAG）。需要选择向量存储方案。

## 决策

采用 **PostgreSQL + pgvector 扩展**，向量存储与业务数据同库。使用 OpenAI `text-embedding-3-small` 模型生成 embedding（512 维）。分块策略为固定大小（~500 tokens）+ 重叠（~50 tokens）+ 章节标题上下文。

## 拒绝的选项

- **独立向量数据库（Milvus / Pinecone / Weaviate）**：检索性能更强，但引入额外运维负担（部署、监控、备份）。MVP 规模下 pgvector 的检索精度和性能完全够用，且数据和向量同库意味着事务一致性、单次备份、零延迟同步。
- **OpenAI Assistants API 内置检索**：开发最快，但检索策略黑盒不可控，且教材语料库可能需要频繁更新，外部 API 的检索语料管理不够灵活。

## 后果

- Drizzle schema 需包含 `chunks` 表，含 `embedding vector(512)` 列。
- 检索混合模式：语义检索（pgvector cosine similarity）+ 关键词过滤。
- 后续如果需要更高级的检索能力，存储层切换路径清晰：`chunks` 表保留，只需替换 embedding 生成和检索调用。

