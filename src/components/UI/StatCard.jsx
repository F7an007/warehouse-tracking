import React from 'react';

const colorMap = {
  received: 'border-l-blue-500 bg-blue-50 text-blue-600',
  sorting: 'border-l-purple-500 bg-purple-50 text-purple-600',
  stored: 'border-l-indigo-500 bg-indigo-50 text-indigo-600',
  ready: 'border-l-orange-500 bg-orange-50 text-orange-600',
  shipped: 'border-l-green-500 bg-green-50 text-green-600',
};

const StatCard = ({ title, value, icon: Icon, color = 'received', subtitle, onClick }) => {
  const colorStyles = colorMap[color] || colorMap.received;
  
  // Extract border color for the card and bg/text for the icon container
  const [borderColor, bgClass, textClass] = colorStyles.split(' ');

  const CardComponent = onClick ? 'button' : 'div';
  
  return (
    <CardComponent
      onClick={onClick}
      className={`relative bg-white rounded-xl shadow-sm border border-gray-100 ${borderColor} border-l-[4px] p-5 w-full text-left min-h-[48px] ${
        onClick ? 'hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        
        {Icon && (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgClass} ${textClass}`}>
            {React.isValidElement(Icon) ? Icon : <Icon className="w-6 h-6" />}
          </div>
        )}
      </div>
    </CardComponent>
  );
};

export default StatCard;
