import { useState } from 'react';
import useGroups from '../hooks/useGroups';
import '../styles/ExpensePage.css';
import API from '../services/api.js';

const AddExpense = () => {
  const { groups } = useGroups();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [submittedExpenses, setSubmittedExpenses] = useState([]);
  const [settlementInstructions, setSettlementInstructions] = useState([]);

  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitType: 'equal',
    percentages: {},
    values: {}
  });

  const fetchExpenses = async (groupId) => {
    try {
      const response = await API.get(`/expense/${groupId}`);
      setSubmittedExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSettleAll = async () => {
    if (!selectedGroup) return;
    try {
      const response = await API.get(`/expense/${selectedGroup._id}/settle`);
      setSettlementInstructions(response.data.instructions);
    } catch (err) {
      console.error("Settlement calculation failed:", err);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await API.delete(`/expense/${id}`);
      setSubmittedExpenses(prev => prev.filter(exp => exp._id !== id));
      setSettlementInstructions([]);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenseData.amount || isNaN(expenseData.amount)) return;

    const payload = {
      description: expenseData.description,
      amount: parseFloat(expenseData.amount),
      paidBy: expenseData.paidBy,
      groupId: selectedGroup._id,
      splitType: expenseData.splitType,
      splitDetails: expenseData.splitType === 'percentage'
        ? expenseData.percentages
        : expenseData.values
    };

    try {
      await API.post('/expense', payload);
      fetchExpenses(selectedGroup._id);

      setExpenseData({
        description: '',
        amount: '',
        paidBy: selectedGroup.members[0],
        splitType: 'equal',
        percentages: Object.fromEntries(selectedGroup.members.map(m => [m, 0])),
        values: Object.fromEntries(selectedGroup.members.map(m => [m, 0]))
      });

    } catch (err) {
      console.error("Failed to save expense:", err);
    }
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setSearchTerm('');
    fetchExpenses(group._id);
    const initialPercentages = {};
    const initialValues = {};
    group.members.forEach(member => {
      initialPercentages[member] = 0;
      initialValues[member] = 0;
    });

    setExpenseData({
      ...expenseData,
      paidBy: group.members[0],
      percentages: initialPercentages,
      values: initialValues
    });
  };

  const handlePercentageChange = (member, value) => {
    setExpenseData({
      ...expenseData,
      percentages: {
        ...expenseData.percentages,
        [member]: parseFloat(value) || 0
      }
    });
  };

  const handleValueChange = (member, value) => {
    setExpenseData({
      ...expenseData,
      values: {
        ...expenseData.values,
        [member]: parseFloat(value) || 0
      }
    });
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Add Expense</h2>
      <div className='main-layout'>
        <div className="left-column">
          <div className="search-wrapper">
            <input
              type="text"
              className="form-input search-bar"
              placeholder="Search group name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className="dropdown-results">
                {filteredGroups.map(group => (
                  <div key={group._id} className="dropdown-item" onClick={() => handleSelectGroup(group)}>
                    {group.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {!selectedGroup ? (
            <div className='empty'>
              <h3>No groups chosen yet</h3>
              <p>Start by searching a group</p>
            </div>
          ) : (
            <div className="expense-card">
              <div className="selected-header">
                <h3>Group: {selectedGroup.name}</h3>
                <button className="change-btn" onClick={() => setSelectedGroup(null)}>Change</button>
              </div>

              <form onSubmit={handleSubmit} className="group-form">
                <div className="input-group">
                  <input
                    type="text"
                    id='description'
                    className="form-input"
                    value={expenseData.description}
                    placeholder=' '
                    onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                  />
                  <label htmlFor='description' className='floating-label'>Description</label>
                </div>

                <div className="input-group">
                  <input
                    type="number"
                    className="form-input"
                    id='amount'
                    value={expenseData.amount}
                    placeholder=' '
                    onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                  />
                  <label htmlFor='amount' className='floating-label'>Amount</label>
                </div>

                <div className="input-group type-select">
                  <div className='select-group'>
                    <label className='static-label'>Paid by:</label>
                    <select
                      className="form-input custom-select"
                      value={expenseData.paidBy}
                      onChange={(e) => setExpenseData({ ...expenseData, paidBy: e.target.value })}
                    >
                      {selectedGroup.members.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                <div className="input-group type-select">
                  <div className='select-group'>
                    <label className='static-label'>Split type:</label>
                    <select
                      className="form-input custom-select"
                      value={expenseData.splitType}
                      onChange={(e) => setExpenseData({ ...expenseData, splitType: e.target.value })}
                    >
                      <option value="equal">Equally</option>
                      <option value="value">By Value</option>
                      <option value="percentage">By Percentage</option>
                    </select>
                  </div>
                </div>

                {expenseData.splitType === 'percentage' && (
                  <div className="percentage-container">
                    <label style={{ marginBottom: '15px', display: 'block' }}>Assign Percentages</label>
                    {selectedGroup.members.map((member) => (
                      <div key={member} className="percentage-row">
                        <span>{member}</span>
                        <input
                          type="number"
                          className="percentage-input"
                          placeholder="0"
                          value={expenseData.percentages[member] || ''}
                          onChange={(e) => handlePercentageChange(member, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {expenseData.splitType === 'value' && (
                  <div className="value-container">
                    <label style={{ marginBottom: '15px', display: 'block' }}>Assign Values</label>
                    {selectedGroup.members.map((member) => (
                      <div key={member} className="value-row">
                        <span>{member}</span>
                        <input
                          type="number"
                          className="value-input"
                          placeholder="0.00"
                          value={expenseData.values[member] || ''}
                          onChange={(e) => handleValueChange(member, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button type="submit" className="add-btn">Add Expense</button>
              </form>
            </div>
          )}
        </div>

        {selectedGroup && (
          <div className="right-column">
            <div className="summary-card">
              <div className="summary-header">
                <h3>Expenses: {selectedGroup.name}</h3>
                <span className="expense-count">{submittedExpenses.length}</span>
              </div>

              <div className="expense-list">
                {submittedExpenses.length === 0 ? (
                  <p className="empty-msg">No expenses added yet.</p>
                ) : (
                  submittedExpenses.map((exp) => (
                    <div key={exp._id} className="summary-item">
                      <div className="summary-info">
                        <span className="summary-description">{exp.description}</span>
                        <span className="summary-amount">₹{parseFloat(exp.amount).toFixed(2)}</span>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteExpense(exp._id)}
                        >
                          &times;
                        </button>
                      </div>
                      <div className="summary-details">
                        <span>Paid by {exp.paidBy}</span>
                        <span className="split-tag">{exp.splitType}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {submittedExpenses.length > 0 && (
                <div className="summary-footer">
                  <button className="add-btn settle-btn" onClick={handleSettleAll}>Settle All</button>
                </div>
              )}
            </div>

            {settlementInstructions.length > 0 && (
              <div className="settlement-card">
                <div className='settlement-header'>
                  <h3>Optimal Settlement</h3>
                  <button className="delete-btn" onClick={() => setSettlementInstructions([])}>&times;</button>
                </div>
                <ul className="instruction-list">
                  {settlementInstructions.map((text, index) => (
                    <li key={index} className="instruction-item">
                      <span className="check-icon">→</span> {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpense;