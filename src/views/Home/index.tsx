import { Radio, Space } from 'antd';
import useGetTodoList from 'hooks/todos/useGetTodoList';
import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const { data: todoList, loading } = useGetTodoList();
  const [value, setValue] = useState(0);

  // Render
  if (loading) {
    return <div>Loading...</div>;
  }

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      Chọn cổng thanh toán:
      <hr />
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
          <Radio value={4}>Option D</Radio>
          <Radio value={5}>Option E</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
};
export default HomePage;
