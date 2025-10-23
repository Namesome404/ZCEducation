import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Outcome, Article, Contact } from "../../lib/data";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"outcomes" | "articles" | "contacts">("outcomes");
  const [outcomes, setOutcomes] = React.useState<Outcome[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingItem, setEditingItem] = React.useState<Outcome | Article | null>(null);
  const [isCreating, setIsCreating] = React.useState(false);
  const [viewingContact, setViewingContact] = React.useState<Contact | null>(null);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [outcomesRes, articlesRes, contactsRes] = await Promise.all([
        fetch("/api/outcomes"),
        fetch("/api/articles"),
        fetch("/api/contacts"),
      ]);

      if (outcomesRes.status === 401 || articlesRes.status === 401 || contactsRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      setOutcomes(await outcomesRes.json());
      setArticles(await articlesRes.json());
      setContacts(await contactsRes.json());
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleDelete = async (id: number, type: "outcome" | "article" | "contact") => {
    if (!confirm("确认删除？")) return;

    let endpoint = "";
    if (type === "outcome") endpoint = `/api/outcomes/${id}`;
    else if (type === "article") endpoint = `/api/articles/${id}`;
    else if (type === "contact") endpoint = `/api/contacts/${id}`;

    const res = await fetch(endpoint, { method: "DELETE" });

    if (res.ok) {
      loadData();
    }
  };

  const handleUpdateContactStatus = async (id: number, status: Contact['status'], notes?: string) => {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });

    if (res.ok) {
      loadData();
    }
  };

  const handleSave = async (data: any) => {
    const isOutcome = activeTab === "outcomes";
    const endpoint = isOutcome ? "/api/outcomes" : "/api/articles";
    const method = editingItem ? "PUT" : "POST";
    const url = editingItem ? `${endpoint}/${(editingItem as any).id}` : endpoint;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setEditingItem(null);
      setIsCreating(false);
      loadData();
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>加载中...</div>;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard — ZC Education</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="admin-container">
        <header className="admin-header">
          <h1>内容管理</h1>
          <button onClick={handleLogout} className="logout-button">
            退出登录
          </button>
        </header>

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === "outcomes" ? "active" : ""}`}
            onClick={() => setActiveTab("outcomes")}
          >
            案例管理 ({outcomes.length})
          </button>
          <button
            className={`tab-button ${activeTab === "articles" ? "active" : ""}`}
            onClick={() => setActiveTab("articles")}
          >
            文章管理 ({articles.length})
          </button>
          <button
            className={`tab-button ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            咨询信息 ({contacts.filter(c => c.status === 'new').length > 0 && `${contacts.filter(c => c.status === 'new').length} 新 / `}{contacts.length})
          </button>
        </div>

        <div className="admin-content">
          {activeTab !== "contacts" && (
            <div className="content-actions">
              <button
                onClick={() => {
                  setIsCreating(true);
                  setEditingItem(null);
                }}
                className="create-button"
              >
                + 新建{activeTab === "outcomes" ? "案例" : "文章"}
              </button>
            </div>
          )}

          {activeTab === "outcomes" ? (
            <OutcomesManager
              outcomes={outcomes}
              onEdit={setEditingItem}
              onDelete={(id) => handleDelete(id, "outcome")}
            />
          ) : activeTab === "articles" ? (
            <ArticlesManager
              articles={articles}
              onEdit={setEditingItem}
              onDelete={(id) => handleDelete(id, "article")}
            />
          ) : (
            <ContactsManager
              contacts={contacts}
              onView={setViewingContact}
              onDelete={(id) => handleDelete(id, "contact")}
              onUpdateStatus={handleUpdateContactStatus}
            />
          )}
        </div>

        {(editingItem || isCreating) && (
          <EditorModal
            item={editingItem}
            type={activeTab as "outcomes" | "articles"}
            onSave={handleSave}
            onClose={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
          />
        )}

        {viewingContact && (
          <ContactDetailModal
            contact={viewingContact}
            onClose={() => setViewingContact(null)}
            onUpdateStatus={handleUpdateContactStatus}
          />
        )}

        <style jsx>{`
          .admin-container {
            min-height: 100vh;
            background: #F6F4EE;
            padding: 24px;
          }

          .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto 32px;
            padding: 24px;
            background: white;
            border-radius: 12px;
          }

          .admin-header h1 {
            font-size: 24px;
            font-weight: 500;
            color: #1A1F2E;
            margin: 0;
          }

          .logout-button {
            padding: 8px 16px;
            font-size: 14px;
            color: #5B6470;
            background: #E8E9EC;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s;
          }

          .logout-button:hover {
            background: #D8D9DC;
          }

          .admin-tabs {
            display: flex;
            gap: 8px;
            max-width: 1200px;
            margin: 0 auto 24px;
          }

          .tab-button {
            padding: 12px 24px;
            font-size: 15px;
            font-weight: 500;
            color: #5B6470;
            background: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .tab-button.active {
            color: #1A1F2E;
            background: #1A1F2E;
            color: white;
          }

          .admin-content {
            max-width: 1200px;
            margin: 0 auto;
          }

          .content-actions {
            margin-bottom: 16px;
          }

          .create-button {
            padding: 12px 24px;
            font-size: 15px;
            font-weight: 500;
            color: white;
            background: #1A1F2E;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s;
          }

          .create-button:hover {
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    </>
  );
}

function OutcomesManager({
  outcomes,
  onEdit,
  onDelete,
}: {
  outcomes: Outcome[];
  onEdit: (item: Outcome) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="items-grid">
      {outcomes.map((outcome) => (
        <div key={outcome.id} className="item-card">
          <h3>{outcome.field}</h3>
          <p className="item-excerpt">{outcome.narrative}</p>
          <div className="item-meta">
            <span>{outcome.duration}</span>
          </div>
          <div className="item-actions">
            <button onClick={() => onEdit(outcome)} className="edit-button">
              编辑
            </button>
            <button onClick={() => onDelete(outcome.id)} className="delete-button">
              删除
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .item-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .item-card h3 {
          font-size: 16px;
          font-weight: 500;
          color: #1A1F2E;
          margin: 0 0 12px 0;
        }

        .item-excerpt {
          font-size: 14px;
          line-height: 1.6;
          color: #5B6470;
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .item-meta {
          font-size: 13px;
          color: #8D96A7;
          margin-bottom: 16px;
        }

        .item-actions {
          display: flex;
          gap: 8px;
        }

        .edit-button,
        .delete-button {
          flex: 1;
          padding: 8px;
          font-size: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .edit-button {
          background: #E8E9EC;
          color: #1A1F2E;
        }

        .delete-button {
          background: #FFEBEE;
          color: #D32F2F;
        }

        .edit-button:hover,
        .delete-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

function ArticlesManager({
  articles,
  onEdit,
  onDelete,
}: {
  articles: Article[];
  onEdit: (item: Article) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="items-grid">
      {articles.map((article) => (
        <div key={article.id} className="item-card">
          <h3>{article.title}</h3>
          <p className="item-excerpt">{article.excerpt}</p>
          <div className="item-meta">
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
          <div className="item-actions">
            <button onClick={() => onEdit(article)} className="edit-button">
              编辑
            </button>
            <button onClick={() => onDelete(article.id)} className="delete-button">
              删除
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .item-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .item-card h3 {
          font-size: 16px;
          font-weight: 500;
          color: #1A1F2E;
          margin: 0 0 12px 0;
        }

        .item-excerpt {
          font-size: 14px;
          line-height: 1.6;
          color: #5B6470;
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .item-meta {
          font-size: 13px;
          color: #8D96A7;
          margin-bottom: 16px;
          display: flex;
          gap: 12px;
        }

        .item-actions {
          display: flex;
          gap: 8px;
        }

        .edit-button,
        .delete-button {
          flex: 1;
          padding: 8px;
          font-size: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .edit-button {
          background: #E8E9EC;
          color: #1A1F2E;
        }

        .delete-button {
          background: #FFEBEE;
          color: #D32F2F;
        }

        .edit-button:hover,
        .delete-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

function ContactsManager({
  contacts,
  onView,
  onDelete,
  onUpdateStatus,
}: {
  contacts: Contact[];
  onView: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, status: Contact['status']) => void;
}) {
  const getStatusBadge = (status: Contact['status']) => {
    const badges = {
      new: { text: '新消息', color: '#1976D2' },
      read: { text: '已读', color: '#8D96A7' },
      replied: { text: '已回复', color: '#388E3C' },
    };
    return badges[status];
  };

  return (
    <div className="contacts-list">
      {contacts.map((contact) => {
        const badge = getStatusBadge(contact.status);
        return (
          <div key={contact.id} className="contact-card">
            <div className="contact-header">
              <span className="contact-badge" style={{ backgroundColor: badge.color }}>
                {badge.text}
              </span>
              <span className="contact-date">
                {new Date(contact.createdAt).toLocaleString('zh-CN')}
              </span>
            </div>
            <div className="contact-preview">
              <strong>联系方式：</strong>
              {contact.contact}
            </div>
            <div className="contact-actions">
              <button onClick={() => onView(contact)} className="view-button">
                查看详情
              </button>
              {contact.status === 'new' && (
                <button onClick={() => onUpdateStatus(contact.id, 'read')} className="mark-read-button">
                  标记已读
                </button>
              )}
              {contact.status === 'read' && (
                <button onClick={() => onUpdateStatus(contact.id, 'replied')} className="mark-replied-button">
                  标记已回复
                </button>
              )}
              <button onClick={() => onDelete(contact.id)} className="delete-button">
                删除
              </button>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .contacts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .contact-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .contact-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          color: white;
        }

        .contact-date {
          font-size: 13px;
          color: #8D96A7;
        }

        .contact-preview {
          font-size: 14px;
          color: #5B6470;
          margin-bottom: 16px;
        }

        .contact-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .view-button,
        .mark-read-button,
        .mark-replied-button,
        .delete-button {
          padding: 8px 16px;
          font-size: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .view-button {
          background: #1A1F2E;
          color: white;
        }

        .mark-read-button {
          background: #E3F2FD;
          color: #1976D2;
        }

        .mark-replied-button {
          background: #E8F5E9;
          color: #388E3C;
        }

        .delete-button {
          background: #FFEBEE;
          color: #D32F2F;
        }

        .view-button:hover,
        .mark-read-button:hover,
        .mark-replied-button:hover,
        .delete-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

function ContactDetailModal({
  contact,
  onClose,
  onUpdateStatus,
}: {
  contact: Contact;
  onClose: () => void;
  onUpdateStatus: (id: number, status: Contact['status'], notes?: string) => void;
}) {
  const [notes, setNotes] = React.useState(contact.notes || '');

  const handleSaveNotes = () => {
    onUpdateStatus(contact.id, contact.status, notes);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <h2>咨询详情</h2>
        
        <div className="contact-detail-section">
          <h3>学术背景</h3>
          <p>{contact.background}</p>
        </div>

        <div className="contact-detail-section">
          <h3>时间与目标</h3>
          <p>{contact.timeline}</p>
        </div>

        <div className="contact-detail-section">
          <h3>最想解决的问题</h3>
          <p>{contact.interest}</p>
        </div>

        <div className="contact-detail-section">
          <h3>联系方式</h3>
          <p><strong>{contact.contact}</strong></p>
        </div>

        <div className="contact-detail-section">
          <h3>备注</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="添加内部备注..."
            rows={4}
          />
        </div>

        <div className="contact-detail-meta">
          <span>提交时间：{new Date(contact.createdAt).toLocaleString('zh-CN')}</span>
        </div>

        <div className="modal-actions-bottom">
          <button onClick={handleSaveNotes} className="save-notes-button">
            保存备注
          </button>
          <button onClick={onClose} className="cancel-button-modal">
            关闭
          </button>
        </div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 24px;
          }

          .contact-modal {
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .modal-close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            border: none;
            background: #E8E9EC;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #5B6470;
          }

          .modal-close-btn:hover {
            background: #D8D9DC;
          }

          .contact-modal h2 {
            font-size: 24px;
            font-weight: 500;
            color: #1A1F2E;
            margin: 0 0 24px 0;
          }

          .contact-detail-section {
            margin-bottom: 24px;
          }

          .contact-detail-section h3 {
            font-size: 14px;
            font-weight: 500;
            color: #8D96A7;
            margin: 0 0 8px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .contact-detail-section p {
            font-size: 16px;
            line-height: 1.6;
            color: #1A1F2E;
            margin: 0;
            white-space: pre-wrap;
          }

          .contact-detail-section textarea {
            width: 100%;
            padding: 12px;
            font-size: 15px;
            border: 1px solid #E8E9EC;
            border-radius: 8px;
            font-family: inherit;
            resize: vertical;
          }

          .contact-detail-section textarea:focus {
            outline: none;
            border-color: #3E4C63;
          }

          .contact-detail-meta {
            font-size: 13px;
            color: #8D96A7;
            margin: 24px 0;
            padding-top: 24px;
            border-top: 1px solid #E8E9EC;
          }

          .modal-actions-bottom {
            display: flex;
            gap: 12px;
          }

          .save-notes-button,
          .cancel-button-modal {
            flex: 1;
            padding: 12px;
            font-size: 15px;
            font-weight: 500;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s;
          }

          .save-notes-button {
            background: #1A1F2E;
            color: white;
          }

          .cancel-button-modal {
            background: #E8E9EC;
            color: #5B6470;
          }

          .save-notes-button:hover,
          .cancel-button-modal:hover {
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    </div>
  );
}

function EditorModal({
  item,
  type,
  onSave,
  onClose,
}: {
  item: Outcome | Article | null;
  type: "outcomes" | "articles";
  onSave: (data: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = React.useState<any>(
    item || (type === "outcomes"
      ? { field: "", narrative: "", duration: "", keyMilestone: "" }
      : { title: "", date: "", excerpt: "", readTime: "", content: "" })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{item ? "编辑" : "新建"}{type === "outcomes" ? "案例" : "文章"}</h2>
        <form onSubmit={handleSubmit}>
          {type === "outcomes" ? (
            <>
              <label>
                领域
                <input
                  type="text"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  required
                />
              </label>
              <label>
                叙述
                <textarea
                  value={formData.narrative}
                  onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                  rows={4}
                  required
                />
              </label>
              <label>
                时长
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="例：16 个月"
                  required
                />
              </label>
              <label>
                关键节点
                <textarea
                  value={formData.keyMilestone}
                  onChange={(e) => setFormData({ ...formData, keyMilestone: e.target.value })}
                  rows={2}
                  required
                />
              </label>
            </>
          ) : (
            <>
              <label>
                标题
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </label>
              <label>
                日期
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="例：2024.09"
                  required
                />
              </label>
              <label>
                摘要
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  required
                />
              </label>
              <label>
                阅读时长
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="例：5 min"
                  required
                />
              </label>
              <label>
                正文（可选）
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                />
              </label>
            </>
          )}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              取消
            </button>
            <button type="submit" className="save-button">
              保存
            </button>
          </div>
        </form>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 24px;
          }

          .modal-content {
            background: white;
            padding: 32px;
            border-radius: 16px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .modal-content h2 {
            font-size: 24px;
            font-weight: 500;
            color: #1A1F2E;
            margin: 0 0 24px 0;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #1A1F2E;
          }

          input,
          textarea {
            padding: 10px;
            font-size: 15px;
            border: 1px solid #E8E9EC;
            border-radius: 6px;
            font-family: inherit;
            transition: border-color 0.2s;
          }

          input:focus,
          textarea:focus {
            outline: none;
            border-color: #3E4C63;
          }

          textarea {
            resize: vertical;
          }

          .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 8px;
          }

          .cancel-button,
          .save-button {
            flex: 1;
            padding: 12px;
            font-size: 15px;
            font-weight: 500;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s;
          }

          .cancel-button {
            background: #E8E9EC;
            color: #5B6470;
          }

          .save-button {
            background: #1A1F2E;
            color: white;
          }

          .cancel-button:hover,
          .save-button:hover {
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    </div>
  );
}

