import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFetchClient } from "@strapi/helper-plugin"; // 使用 Strapi 提供的 HTTP 客户端
import pluginId from "../../pluginId";
import Select from "react-select"; // 导入 react-select
import "../../global.css"; // 导入你的全局样式
import { Flex } from "@strapi/design-system";

// 自定义勾选框样式的 Option 组件
const CustomOption = (props) => {
  const { data, innerRef, innerProps } = props;
  console.log(props);
  return (
    <div ref={innerRef} {...innerProps} className="custom-option">
      <div
        className="custom-tag"
        style={{
          color: data.textColor,
          backgroundColor: data.bgColor,
        }}
      >
        {data.name}
      </div>
    </div>
  );
};
const TagSelector = ({ onChange, value, name, description }) => {
  const [tags, setTags] = useState([]); // 所有可用的标签
  const { get } = useFetchClient(); // 使用 Strapi 的 HTTP 客户端

  // 从后端加载标签
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await get(`/${pluginId}/list`); // 获取标签数据
        setTags(data);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    fetchTags();
  }, [get]);

  // 初始化选中的标签
  useEffect(() => {
    if (value && value !== "null") {
      // 将 JSON 字符串解析为数组
      const parsedValue = JSON.parse(value);
      setSelectedTags(parsedValue);
    }
  }, [value]);

  const [selectedTags, setSelectedTags] = useState([]); // 当前选中的标签

  // 处理标签选择变化
  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedTags(selectedIds);
    onChange({ target: { name, value: JSON.stringify(selectedIds) } });
  };

  // 格式化标签为 react-select 所需的选项格式
  const tagOptions = tags.map((tag) => ({
    value: tag.id,
    textColor: tag.textColor,
    bgColor: tag.bgColor,
    name: tag.name,
    label: (
        <div
            className="selected-tag"
            style={{
              color: tag.textColor,
              backgroundColor: tag.bgColor,
            }}
        >
          {tag.name}
        </div>
    ),
  }));

  // 自定义过滤函数，模糊匹配标签名称
  const filterOption = (candidate, input) => {
    const label = candidate.data.name.toLowerCase(); // 标签名称小写
    const inputValue = input.toLowerCase(); // 输入值小写
    return label.includes(inputValue); // 如果标签名称包含输入值，则通过过滤
  };

  return (
    <Flex
      className="custom-multi-select"
      direction="column"
      gap={1}
      alignItems="stretch"
    >
      <label>{name}</label>
      <Select
        isMulti // 启用多选
        options={tagOptions} // 提供选项
        value={selectedTags.map((id) =>
          tagOptions.find((option) => option.value === id)
        )}
        onChange={handleSelectChange}
        placeholder="Select tags"
        filterOption={filterOption} // 使用自定义的模糊搜索过滤函数
        // menuIsOpen={true} // 保持下拉框打开
        components={{
          Option: CustomOption, // 使用自定义的 Option 组件
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "40px",
            borderColor: "#DCDCE4",
            fontSize: "0.875rem",
          }),
          multiValue: (provided) => ({
            ...provided,
            borderRadius: "25px",
            height: "30px", //
            margin: "2px 5px",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999, // 确保下拉菜单本身在顶部
          }),
        }}
      />
      {description && <div className="hint">{description}</div>}
    </Flex>
  );
};

TagSelector.propTypes = {
  onChange: PropTypes.func.isRequired, // onChange 是必需的
  value: PropTypes.string, // value 是一个 JSON 字符串，存储选中的标签ID数组
  name: PropTypes.string.isRequired, // name 是必需的
  description: PropTypes.string, // description 是可选的
};

export default TagSelector;
